import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	SelectControl,
  	TextControl,
} from '@wordpress/components';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

const POSITION_SUPPORT_BLOCKS = ['core/group', 'core/cover', 'core/column'];

const withCustomPositionControls = createHigherOrderComponent((BlockEdit) => (props) => {
	if (!POSITION_SUPPORT_BLOCKS.includes(props.name)) return <BlockEdit {...props} />;

	const { attributes, setAttributes } = props;
	const { cbePosition, cbeOffset, cbeZIndex } = attributes;

	return (
		<Fragment>
			<BlockEdit {...props} />
			<InspectorControls>
				<PanelBody title="Advanced Positioning" initialOpen={false}>
					<SelectControl
						label="CSS-Position"
						value={cbePosition}
						options={[
							{ label: 'Standard', value: '' },
							{ label: 'Relative', value: 'relative' },
							{ label: 'Absolute', value: 'absolute' },
							{ label: 'Fixed', value: 'fixed' },
							{ label: 'Sticky', value: 'sticky' },
						]}
						onChange={(value) => setAttributes({ cbePosition: value })}
					/>
					<TextControl label="Z-Index" value={cbeZIndex} onChange={(v) => setAttributes({ cbeZIndex: v })} />
					<BoxControl
						label="Offset"
						values={ attributes.cbeOffset || {} }
						onChange={(newValues) => {
							setAttributes({ cbeOffset: newValues });
						}}
						units={ [ 'px', '%', 'em', 'rem', 'vh', 'vw' ] }
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}, 'withCustomPositionControls');

addFilter('editor.BlockEdit', 'cbe/custom-position-controls', withCustomPositionControls);

function addCustomAttributes(settings, name) {
	if (!POSITION_SUPPORT_BLOCKS.includes(name)) return settings;

	return {
		...settings,
		attributes: {
			...settings.attributes,
			cbePosition: { type: 'string' },
			cbeOffset: {
				type: 'object',
				default: {
					top: null,
					right: null,
					bottom: null,
					left: null,
				},
			},
			cbeZIndex: { type: 'string' },
		},
	};
}
addFilter('blocks.registerBlockType', 'cbe/add-custom-attributes', addCustomAttributes);

function applyCustomStyles(extraProps, blockType, attributes) {
	if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return extraProps;

	const { cbePosition, cbeOffset, cbeZIndex	} = attributes;

	extraProps.style = {
		...extraProps.style,
		...( cbePosition && {position: cbePosition} ),
		...( cbeOffset?.top && {top: cbeOffset.top} ),
		...( cbeOffset?.right && {right: cbeOffset.right} ),
		...( cbeOffset?.bottom && {bottom: cbeOffset.bottom} ),
		...( cbeOffset?.left && {left: cbeOffset.left} ),
		...( cbeZIndex && !isNaN( parseInt(cbeZIndex) ) ? {zIndex: parseInt(cbeZIndex)} : {} ),
	};

	return extraProps;
}
addFilter('blocks.getSaveContent.extraProps', 'cbe/apply-custom-styles', applyCustomStyles);

addFilter(
	'editor.BlockListBlock',
	'cbe/editor-inline-style',
	(BlockListBlock) => (props) => {
		console.log('BlockListBlock Filter aktiv')
		if (!['core/group', 'core/cover', 'core/column'].includes(props.name)) {
			return <BlockListBlock {...props} />;
		}

		const { attributes } = props;

		const wrapperProps = {
			...props.wrapperProps,
			style: {
				...props.wrapperProps?.style,
				'--cbe-position': attributes.cbePosition || undefined,
				'--cbe-top': attributes.cbeOffset?.top || undefined,
				'--cbe-right': attributes.cbeOffset?.right || undefined,
				'--cbe-bottom': attributes.cbeOffset?.bottom || undefined,
				'--cbe-left': attributes.cbeOffset?.left || undefined,
				'--cbe-z-index': !isNaN(parseInt(attributes.cbeZIndex)) ? parseInt(attributes.cbeZIndex) : undefined,
			},
		};

		return <BlockListBlock {...props} wrapperProps={wrapperProps} />;
	}
);

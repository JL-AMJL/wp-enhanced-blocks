import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	SelectControl,
  	TextControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

const POSITION_SUPPORT_BLOCKS = ['core/group', 'core/cover', 'core/column'];

const withCustomPositionControls = createHigherOrderComponent((BlockEdit) => (props) => {
	if (!POSITION_SUPPORT_BLOCKS.includes(props.name)) return <BlockEdit {...props} />;

	const { attributes, setAttributes } = props;
	const { cbePosition, cbeOffset, cbeZIndex, cbeWidth100 } = attributes;

	console.log('ATTRIBUTES', attributes);

	return (
		<Fragment>
			<BlockEdit {...props} />
			<InspectorControls>
				<PanelBody title="Advanced Positioning" initialOpen={false}>
					<ToggleControl
						label="Breite auf 100% setzen"
						checked={ attributes.cbeWidth100 }
						onChange={ (value) => setAttributes({ cbeWidth100: value }) }
					/>
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
			cbeWidth100: { type: 'boolean', default: false },
		},
		supports: {
			...settings.supports,
			className: true,
		},
	};
}
addFilter('blocks.registerBlockType', 'cbe/add-custom-attributes', addCustomAttributes);

function applyCustomClassNames(extraProps, blockType, attributes) {
	if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return extraProps;

	if (attributes.cbeWidth100) {
		extraProps.className = `${extraProps.className || ''} cbe-width-100`.trim();
	}

	if (attributes.cbePosition) {
		extraProps.className = `${extraProps.className || ''} cbe-position-${attributes.cbePosition}`.trim();
	}

	return extraProps;
}
addFilter('blocks.getSaveContent.extraProps', 'cbe/apply-classnames', applyCustomClassNames);



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

addFilter(
	'blocks.getBlockAttributes',
	'cbe/apply-classnames-to-edit',
	(attributes, blockType) => {
		if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return attributes;

		let className = attributes.className || '';

		if (attributes.cbeWidth100 && !className.includes('cbe-width-100')) {
			className += ' cbe-width-100';
		}

		// Position behandeln wir später, daher hier nicht einfügen

		return {
			...attributes,
			className: className.trim(),
		};
	}
);
import { BoxControl } from '@wordpress/components/build-module';
import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	SelectControl,
  TextControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

console.log('BoxControl:', BoxControl);

const allowedBlocks = ['core/group'];

const withCustomPositionControls = createHigherOrderComponent((BlockEdit) => (props) => {
	if (!allowedBlocks.includes(props.name)) return <BlockEdit {...props} />;

	const { attributes, setAttributes } = props;
	const {
		cbePosition, cbeZIndex, cbeTop, cbeLeft, cbeRight, cbeBottom,
	} = attributes;

  const positionValues = {
    top: typeof cbeTop === 'string' ? cbeTop : '',
    right: typeof cbeRight === 'string' ? cbeRight : '',
    bottom: typeof cbeBottom === 'string' ? cbeBottom : '',
    left: typeof cbeLeft === 'string' ? cbeLeft : '',
  };

	return (
		<Fragment>
			<BlockEdit {...props} />
			<InspectorControls>
				<PanelBody title="Positionierung" initialOpen={false}>
					<SelectControl
						label="Position"
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
            values={positionValues}
            onChange={(newValues) => {
              setAttributes({
                cbeTop: newValues.top ?? '',
                cbeRight: newValues.right ?? '',
                cbeBottom: newValues.bottom ?? '',
                cbeLeft: newValues.left ?? '',
              });
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
	if (!allowedBlocks.includes(name)) return settings;

	return {
		...settings,
		attributes: {
			...settings.attributes,
			cbePosition: { type: 'string', default: '' },
			cbeZIndex: { type: 'string', default: '' },
			cbeTop: { type: 'string', default: '' },
			cbeLeft: { type: 'string', default: '' },
			cbeRight: { type: 'string', default: '' },
			cbeBottom: { type: 'string', default: '' },
		},
	};
}
addFilter('blocks.registerBlockType', 'cbe/add-custom-attributes', addCustomAttributes);

function applyCustomStyles(extraProps, blockType, attributes) {
	if (!allowedBlocks.includes(blockType.name)) return extraProps;

	const {
		cbePosition, cbeZIndex, cbeTop, cbeLeft, cbeRight, cbeBottom,
	} = attributes;

	extraProps.style = {
		...extraProps.style,
		position: cbePosition || undefined,
		zIndex: cbeZIndex || undefined,
		top: cbeTop || undefined,
		left: cbeLeft || undefined,
		right: cbeRight || undefined,
		bottom: cbeBottom || undefined,
	};

	return extraProps;
}
addFilter('blocks.getSaveContent.extraProps', 'cbe/apply-custom-styles', applyCustomStyles);
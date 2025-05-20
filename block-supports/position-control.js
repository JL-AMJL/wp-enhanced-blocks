import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	SelectControl,
  	TextControl,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useEffect } from '@wordpress/element';
import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween,
	justifyStretch,
	justifyTop,
	justifyCenterVertical,
	justifyBottom,
	justifySpaceBetweenVertical,
	justifyStretchVertical,
} from '@wordpress/icons';

const POSITION_SUPPORT_BLOCKS = ['core/group', 'core/cover', 'core/column'];

// Function to dynamically set the width of fixed elements in the editor
const updateFixedElementWidth = () => {
    console.log('Running updateFixedElementWidth for .cbe-position-fixed');

    // Re-query skeletonContent and all fixed elements dynamically
    const skeletonContent = document.querySelector('.interface-interface-skeleton__content');
    const fixedElements = document.querySelectorAll('.cbe-position-fixed'); // Target all elements with the cbe-position-fixed class

    if (skeletonContent && fixedElements.length > 0) {
        console.log('Found skeletonContent:', skeletonContent);
        console.log('Found fixedElements:', fixedElements);

        // Calculate and apply the new width for each fixed element
        const newWidth = `${skeletonContent.offsetWidth}px`;
        fixedElements.forEach((fixedElement) => {
            fixedElement.style.setProperty('width', newWidth, 'important'); // Apply with !important
            console.log('Updated width of fixedElement to:', newWidth, fixedElement);
        });
    } else {
        if (!skeletonContent) console.log('Skeleton content not found.');
        if (fixedElements.length === 0) console.log('No elements with class .cbe-position-fixed found.');
    }
};

// Higher-order component to add custom position controls
const withCustomPositionControls = createHigherOrderComponent((BlockEdit) => (props) => {
	if (!POSITION_SUPPORT_BLOCKS.includes(props.name)) return <BlockEdit {...props} />;

	const { attributes, setAttributes, clientId} = props;
	const { cbePosition, cbeOffset, cbeZIndex, cbeWidth100, cbeEditorPositionOverride, cbeJustifyContent, cbeAlignContent, cbeAlignItems } = attributes;

	useEffect(() => {
		console.log('useEffect triggered for .bg-slider');
	
		// Only apply dynamic width in the editor
		if (cbePosition === 'fixed' && cbeWidth100 && !cbeEditorPositionOverride) {
			console.log('Conditions met for updating width.');
			updateFixedElementWidth();
	
			// Update the width on window resize
			const handleResize = () => {
				console.log('Window resized, updating width for .bg-slider');
				updateFixedElementWidth();
			};
			window.addEventListener('resize', handleResize);
	
			// Observe DOM changes to reapply width updates
			const observer = new MutationObserver((mutationsList) => {
				console.log('DOM changed, reapplying width update.');
				for (const mutation of mutationsList) {
					if (mutation.type === 'childList' || mutation.type === 'attributes') {
						console.log('Mutation detected:', mutation);
						updateFixedElementWidth();
					}
				}
			});
	
			// Observe the parent container of the editor and secondary panel
			const skeleton = document.querySelector('.interface-interface-skeleton');
			if (skeleton) {
				observer.observe(skeleton, {
					childList: true,
					subtree: true,
					attributes: true,
				});
				console.log('MutationObserver is now observing:', skeleton);
			} else {
				console.log('Skeleton container not found.');
			}
	
			// Cleanup event listeners and observer on unmount
			return () => {
				console.log('Cleaning up resize listener and MutationObserver for .bg-slider');
				window.removeEventListener('resize', handleResize);
				observer.disconnect();
			};
		} else {
			console.log('Conditions not met for updating width.');
		}
	}, [cbePosition, cbeWidth100, cbeEditorPositionOverride]);

	return (
		<Fragment>
			<BlockEdit {...props} />
			<InspectorControls>
				<PanelBody title="Advanced Layout" initialOpen>
					<ToggleGroupControl
						label="Justify Content"
						value={cbeJustifyContent}
						onChange={(value) =>
							setAttributes({ cbeJustifyContent: value === cbeJustifyContent ? undefined : value })
						}
						isBlock
					>
						<ToggleGroupControlOptionIcon value="flex-start" icon={justifyLeft} />
						<ToggleGroupControlOptionIcon value="center" icon={justifyCenter} />
						<ToggleGroupControlOptionIcon value="flex-end" icon={justifyRight} />
						<ToggleGroupControlOptionIcon value="space-between" icon={justifySpaceBetween} />
						<ToggleGroupControlOptionIcon value="stretch" icon={justifyStretch} />
					</ToggleGroupControl>
					<ToggleGroupControl
						label="Align Content"
						value={cbeAlignContent}
						onChange={(value) =>
							setAttributes({ cbeAlignContent: value === cbeAlignContent ? undefined : value })
						}
						isBlock
					>
						<ToggleGroupControlOptionIcon value="flex-start" icon={justifyTop} />
						<ToggleGroupControlOptionIcon value="center" icon={justifyCenterVertical} />
						<ToggleGroupControlOptionIcon value="flex-end" icon={justifyBottom} />
						<ToggleGroupControlOptionIcon value="space-between" icon={justifySpaceBetweenVertical} />
						<ToggleGroupControlOptionIcon value="stretch" icon={justifyStretchVertical} />
					</ToggleGroupControl>
					<ToggleGroupControl
						label="Align Items"
						value={cbeAlignItems}
						onChange={(value) =>
							setAttributes({ cbeAlignItems: value === cbeAlignItems ? undefined : value })
						}
						isBlock
					>
						<ToggleGroupControlOptionIcon value="flex-start" icon={justifyTop} />
						<ToggleGroupControlOptionIcon value="center" icon={justifyCenterVertical} />
						<ToggleGroupControlOptionIcon value="flex-end" icon={justifyBottom} />
						<ToggleGroupControlOptionIcon value="stretch" icon={justifyStretchVertical} />
					</ToggleGroupControl>
				</PanelBody>
				<PanelBody title="Advanced Positioning" initialOpen={false}>
					<ToggleControl
						label="Breite auf 100% setzen"
						checked={ attributes.cbeWidth100 }
						onChange={ (value) => setAttributes({ cbeWidth100: value }) }
					/>
					<ToggleControl
						label="Positon im Editor deaktivieren"
						checked={ attributes.cbeEditorPositionOverride }
						onChange={ (value) => setAttributes({ cbeEditorPositionOverride: value }) }
					/>
					<p className="components-base-control__help">
						Deaktiviert die CSS-Positionierung nur im Editor. Nützlich für besseres Layout beim Bearbeiten.
					</p>
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
			cbeEditorPositionOverride: {type: 'boolean', default: false},
			cbeJustifyContent: { type: 'string' , default: '' },
			cbeAlignContent: { type: 'string' , default: '' },
			cbeAlignItems: { type: 'string' , default: '' },
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

	const cleaned = (extraProps.className || '').split(' ')
	.filter(cls => !cls.startsWith('cbe-'));

	if (attributes.cbeWidth100) {
		cleaned.push('cbe-width-100');
	}

	if (attributes.cbePosition) {
		cleaned.push(`cbe-position-${attributes.cbePosition}`);
	}

	if (attributes.cbeJustifyContent) {
		cleaned.push(`cbe-justify-content-${attributes.cbeJustifyContent}`);
	}

	if (attributes.cbeAlignContent) {
		cleaned.push(`cbe-align-content-${attributes.cbeAlignContent}`);
	}

	if (attributes.cbeAlignItems) {
		cleaned.push(`cbe-align-items-${attributes.cbeAlignItems}`);
	}

	extraProps.className = cleaned.join(' ');

	return extraProps;
}
addFilter('blocks.getSaveContent.extraProps', 'cbe/apply-classnames', applyCustomClassNames);

function applyCustomStyles(extraProps, blockType, attributes) {
	if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return extraProps;

	const { cbeOffset, cbeZIndex } = attributes;

	extraProps.style = {
		...extraProps.style,
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

		const cleanedClassNames = (props.wrapperProps?.className || '').split(' ').filter(cls => !cls.startsWith('cbe-'));

		if (attributes.cbeWidth100) {
			cleanedClassNames.push('cbe-width-100');
		}
		if (attributes.cbePosition) {
			cleanedClassNames.push(`cbe-position-${attributes.cbePosition}`);
		}
		if (attributes.cbeJustifyContent) {
			cleanedClassNames.push(`cbe-justify-content-${attributes.cbeJustifyContent}`);
		}
		if (attributes.cbeAlignItems) {
			cleanedClassNames.push(`cbe-align-items-${attributes.cbeAlignItems}`);
		}
		if (attributes.cbeAlignContent) {
			cleanedClassNames.push(`cbe-align-content-${attributes.cbeAlignContent}`);
		}

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
			className: cleanedClassNames.join(' ')
		};

		return <BlockListBlock {...props} wrapperProps={wrapperProps} />;
	}
);

addFilter(
	'blocks.getBlockAttributes',
	'cbe/apply-classnames-to-edit',
	(attributes, blockType) => {
		if (!POSITION_SUPPORT_BLOCKS.includes(blockType.name)) return attributes;

		const classNames = [attributes.className || ''];

		if (attributes.cbeWidth100) {
			classNames.push('cbe-width-100');
		}

		if (attributes.cbePosition) {
			classNames.push(`cbe-position-${attributes.cbePosition}`);
		}

		if (attributes.cbeEditorPositionOverride) {
			classNames.push('cbe-editor-position-override');
		}

		if (attributes.cbeJustifyContent) {
			classNames.push(`cbe-justify-content-${attributes.cbeJustifyContent}`);
		}

		if (attributes.cbeAlignContent) {
			classNames.push(`cbe-align-content-${attributes.cbeAlignContent}`);
		}

		if (attributes.cbeAlignItems) {
			classNames.push(`cbe-align-items-${attributes.cbeAlignItems}`);
		}

		return {
			...attributes,
			className: classNames.join(' ').trim(),
		};
	}
);
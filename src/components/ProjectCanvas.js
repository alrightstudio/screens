import {h} from 'preact';
import classNames from 'classnames';

export default ({
	url,
	maxWidth,
	backgroundColor,
	screenSize,
	isToolbarVisible,
}) => {
	const canvasStyle = (screenSize === 'desktop') && {
		backgroundColor,
	};
	const viewportClassName = classNames(
		'project-canvas__viewport',
		`project-canvas__viewport--${screenSize}`, {
			'project-canvas--toolbar': isToolbarVisible
		});

	return (
		<div
			style={canvasStyle}
			class="project-canvas">
			<div
				style={{maxWidth}}
				class={viewportClassName}>
				<img
					key={url}
					class="full-width"
					src={url}
				/>
			</div>
		</div>
	);
};
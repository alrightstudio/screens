import {h} from 'preact';

export default ({
	url,
	maxWidth,
}) => (
	<div class="project-canvas">
		<img
			class="db full-width project-canvas__img"
			src={url}
			style={{maxWidth}}
		/>
	</div>
);
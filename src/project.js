import {h, render} from 'preact';

// Component mount notes
const mountProject = document.getElementById('mount-project');

// Render components, replace loading state
render((
	<div>
		i'm rendered with preact
	</div>
), mountProject, mountProject.firstElementChild);
import {h, render} from 'preact';
import ProjectViewer from './components/ProjectViewer';

const {
	PROJECT,
	CLIENT,
	SCREENS,
} = window;

// Component mount notes
const mountProject = document.getElementById('mount-project');

// Render components, replace loading state
render((
	<ProjectViewer
		project={PROJECT}
		client={CLIENT}
		screens={SCREENS}
	/>
), mountProject, mountProject.firstElementChild);
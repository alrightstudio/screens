import {h} from 'preact';
import createClass from '../utils/createClass';
import {KEY_LEFT, KEY_RIGHT, SCREEN_SIZE_ORDER} from '../utils/constants';
import ProjectHeader from './ProjectHeader';
import ProjectCanvas from './ProjectCanvas';
import keys from 'lodash/keys';

export default createClass({
	getDefaultProps() {
		return {
			project: {},
			clients: {},
			screens: [],
		};
	},

	getInitialState() {
		const currentScreenIndex = 0;
		let currentScreenSize = 'desktop';
		const currentScreen = this.props.screens[currentScreenIndex];
		const currentImage = currentScreen.images[currentScreenSize];

		// Go to a different screen size if not available
		if (!currentImage) {
			for (let i = 0; i < SCREEN_SIZE_ORDER.length; i++) {
				if (currentScreen.images[SCREEN_SIZE_ORDER[i]]) {
					currentScreenSize = SCREEN_SIZE_ORDER[i];
					break;
				}
			}
		}

		return {
			currentScreenIndex,
			currentScreenSize,
		};
	},

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeydown);
	},

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeydown);
	},

	handleKeydown(event) {
		if (event.keyCode === KEY_LEFT) {
			this.goToPreviousScreen();
		} else if (event.keyCode === KEY_RIGHT) {
			this.goToNextScreen();
		}
	},

	goToPreviousScreen() {
		const {currentScreenIndex} = this.state;
		const screenLength = this.props.screens.length;
		let nextIndex = currentScreenIndex;

		if (screenLength === 0) {
			return;
		} else if (currentScreenIndex === 0) {
			nextIndex = screenLength - 1;
		} else {
			nextIndex = currentScreenIndex - 1;
		}

		this.setScreenIndex(nextIndex);
	},

	goToNextScreen() {
		const {currentScreenIndex} = this.state;
		const screenLength = this.props.screens.length;
		let nextIndex = currentScreenIndex;

		if (screenLength === 0) {
			return;
		} else if (currentScreenIndex >= screenLength - 1) {
			nextIndex = 0;
		} else {
			nextIndex = currentScreenIndex + 1;
		}

		this.setScreenIndex(nextIndex);
	},

	setScreenIndex(nextScreenIndex) {
		const {screens} = this.props;
		const {currentScreenSize} = this.state;
		const nextScreen = screens[nextScreenIndex];
		const nextImage = nextScreen.images[currentScreenSize];
		let nextScreenSize = currentScreenSize;

		// Go to a different screen size if not available
		if (!nextImage) {
			for (let i = 0; i < SCREEN_SIZE_ORDER.length; i++) {
				if (nextScreen.images[SCREEN_SIZE_ORDER[i]]) {
					nextScreenSize = SCREEN_SIZE_ORDER[i];
					break;
				}
			}
		}

		this.setState({
			currentScreenIndex: nextScreenIndex,
			currentScreenSize: nextScreenSize
		});
	},

	setScreenSize(currentScreenSize) {
		this.setState({currentScreenSize});
	},

	render() {
		const {screens, client} = this.props;
		const {currentScreenIndex, currentScreenSize} = this.state;
		const currentScreen = screens[currentScreenIndex];
		const availableScreenSizes = keys(currentScreen.images);
		const currentImage = currentScreen.images[currentScreenSize];
		const maxWidth = currentImage.retina ? currentImage.width / 2 : currentImage.width;

		return (
			<div>
				<ProjectHeader
					title={currentScreen.title}
					screenSize={currentScreenSize}
					availableScreenSizes={availableScreenSizes}
					onSelectScreenSize={this.setScreenSize}
					closeUrl={`/${client.uri}`}
					goToPreviousScreen={this.goToPreviousScreen}
					goToNextScreen={this.goToNextScreen}
				/>
				<hr />
				<ProjectCanvas
					url={currentImage.url}
					maxWidth={maxWidth}
					backgroundColor={currentScreen.backgroundColor}
					screenSize={currentScreenSize}
				/>
			</div>
		);
	},
});
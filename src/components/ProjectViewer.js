import {h} from 'preact';
import createClass from '../utils/createClass';
import {KEY_LEFT, KEY_RIGHT, KEY_T, SCREEN_SIZE_ORDER} from '../utils/constants';
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
		let preferredScreenSize = 'desktop';
		const currentScreen = this.props.screens[currentScreenIndex];
		const preferredImage = currentScreen.images[preferredScreenSize];

		// Go to a different screen size if not available
		if (!preferredImage) {
			for (let i = 0; i < SCREEN_SIZE_ORDER.length; i++) {
				if (currentScreen.images[SCREEN_SIZE_ORDER[i]]) {
					preferredScreenSize = SCREEN_SIZE_ORDER[i];
					break;
				}
			}
		}

		return {
			currentScreenIndex,
			preferredScreenSize,
			isToolbarVisible: true,
		};
	},

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeydown);
	},

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeydown);
	},

	handleKeydown(event) {
		switch (event.keyCode) {
			case (KEY_LEFT): {
				this.goToPreviousScreen();
				break;
			}
			case (KEY_RIGHT): {
				this.goToNextScreen();
				break;
			}
			case (KEY_T): {
				this.toggleToolbar();
			}
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

		this.setState({
			currentScreenIndex: nextIndex,
		});
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

		this.setState({
			currentScreenIndex: nextIndex,
		});
	},

	setPreferredScreenSize(preferredScreenSize) {
		this.setState({preferredScreenSize});
	},

	toggleToolbar() {
		this.setState({isToolbarVisible: !this.state.isToolbarVisible});
	},

	hideToolbar() {
		this.setState({isToolbarVisible: false});
	},

	render() {
		const {screens, client} = this.props;
		const {currentScreenIndex, preferredScreenSize, isToolbarVisible} = this.state;
		const currentScreen = screens[currentScreenIndex];
		const availableScreenSizes = keys(currentScreen.images);
		const preferredImage = currentScreen.images[preferredScreenSize];
		let currentScreenSize = preferredScreenSize;

		// Go to a different screen size if not available
		if (!preferredImage) {
			for (let i = 0; i < SCREEN_SIZE_ORDER.length; i++) {
				if (currentScreen.images[SCREEN_SIZE_ORDER[i]]) {
					currentScreenSize = SCREEN_SIZE_ORDER[i];
					break;
				}
			}
		}

		const currentImage = currentScreen.images[currentScreenSize];
		const maxWidth = currentImage.retina ? currentImage.width / 2 : currentImage.width;

		const projectHeader = isToolbarVisible && (
			<div>
				<ProjectHeader
					title={currentScreen.title}
					screenSize={currentScreenSize}
					availableScreenSizes={availableScreenSizes}
					onSelectScreenSize={this.setPreferredScreenSize}
					closeUrl={`/${client.uri}`}
					goToPreviousScreen={this.goToPreviousScreen}
					goToNextScreen={this.goToNextScreen}
					hideToolbar={this.hideToolbar}
				/>
				<hr />
			</div>
		);

		const projectCanvas = (
			<ProjectCanvas
				url={currentImage.url}
				maxWidth={maxWidth}
				backgroundColor={currentScreen.backgroundColor}
				screenSize={currentScreenSize}
				isToolbarVisible={isToolbarVisible}
			/>
		);

		return (
			<div>
				{projectHeader}
				{projectCanvas}
			</div>
		);
	},
});
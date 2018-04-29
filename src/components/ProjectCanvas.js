import {h} from 'preact';
import createClass from '../utils/createClass';

export default createClass({
	componentDidMount() {
		this.setBackgroundColor();
	},

	componentWillUnmount() {
		this.resetBackgroundColor();
	},

	componentDidUpdate() {
		this.setBackgroundColor();
	},

	setBackgroundColor() {
		if (this.props.backgroundColor) {
			document.body.style.backgroundColor = this.props.backgroundColor;
		} else {
			this.resetBackgroundColor();
		}
	},

	resetBackgroundColor() {
		document.body.style.backgroundColor = null;
	},

	render() {
		const {url, maxWidth} = this.props;

		return (
			<div class="project-canvas">
				<img
					key={url}
					class="db full-width project-canvas__img"
					src={url}
					style={{maxWidth}}
				/>
			</div>
		);
	}
});
import {h} from 'preact';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import {SCREEN_SIZE_ORDER} from '../utils/constants';
import classNames from 'classnames';

const ProjectHeader = ({
	title,
	screenSize,
	availableScreenSizes,
	onSelectScreenSize,
	closeUrl,
}) => {
	const orderedAvailableScreenSizes = filter(SCREEN_SIZE_ORDER, size => {
		return includes(availableScreenSizes, size);
	});

	const screenSizeButtons = (
		<ul class="list list--horizontal list--gutter-small">{orderedAvailableScreenSizes.map(size => {
			const isActive = (size === screenSize);
			const onClick = () => onSelectScreenSize(size);
			const buttonClassName = classNames('button--primary', {
				active: isActive
			});

			return (
				<li class="list__item">
					<button
						class={buttonClassName}
						onClick={onClick}>
						{size}
					</button>
				</li>
			);
		})}</ul>
	);

	const onChangeSelect = event => onSelectScreenSize(event.target.value);
	const screenSizeSelect = (
		<select
			class="button--primary"
			onChange={onChangeSelect}>{orderedAvailableScreenSizes.map(size => (
			<option selected={size === screenSize}>
				{size}
			</option>
		))}</select>
	);

	return (
		<div class="grid-container contained pt2 pb2">
			<div class="row">
				<div class="col c4">
					{title}
				</div>
				<div class="col c4 tc">
					<div class="show--lg">
						{screenSizeButtons}
					</div>
					<div class="hide--lg">
						{screenSizeSelect}
					</div>
				</div>
				<div class="col c4 tr">
					<a class="link--hover"
						href={closeUrl}>
						Close
					</a>
				</div>
			</div>
		</div>
	);
};

ProjectHeader.defaultProps = {
	availableScreenSizes: [],
};

export default ProjectHeader;
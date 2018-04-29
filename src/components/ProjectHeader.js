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
	goToPreviousScreen,
	goToNextScreen,
}) => {
	const orderedAvailableScreenSizes = filter(SCREEN_SIZE_ORDER, size => {
		return includes(availableScreenSizes, size);
	});

	const screenSizeButtons = (
		<ul class="list list--horizontal list--gutter-smaller">{orderedAvailableScreenSizes.map(size => {
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
		<div class="bg--gray">
			<div class="grid-container contained pt2 pb2">
				<div class="row">
					<div class="col c6 c4--lg">
						<div class="media media--horizontal media--forward gutter--small align--middle">
							<div class="media__fixed">
								<ul class="list list--horizontal list--gutter-smaller">
									<li class="list__item">
										<button
											class="button--primary"
											onClick={goToPreviousScreen}>
											←
										</button>
									</li>
									<li class="list__item">
										<button
											class="button--primary"
											onClick={goToNextScreen}>
											→
										</button>
									</li>
								</ul>
							</div>
							<div class="media__fluid">
								<div>
									{title}
								</div>
							</div>
						</div>
					</div>
					<div class="col c6 c4--lg tc--lg tr">
						<div class="show--lg">
							{screenSizeButtons}
						</div>
						<div class="hide--lg">
							{screenSizeSelect}
						</div>
					</div>
					<div class="col c4 tr show--lg">
						<a class="button--primary"
							href={closeUrl}>
							Close
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

ProjectHeader.defaultProps = {
	availableScreenSizes: [],
};

export default ProjectHeader;
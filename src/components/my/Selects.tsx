import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { setFiltes, fetchTags } from '../../store/actions';
import { storeState } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import './Selects.css';

type SelectsProps = {
	tags: Array<string>;
	isLoading: boolean;
	limit: number;
	dispatch: ThunkDispatch<storeState, {}, AnyAction>;
}

class Selects extends Component<SelectsProps, {}> {

  componentDidMount() {
		if (this.props.tags.length === 0) {
			this.props.dispatch(fetchTags());
		}
	}

	onChangeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
    this.props.dispatch(setFiltes({
      [ev.target.name]: ev.target.value,
    }));
	}

  render() {
    return(
			<div className="flex">
				<div className="subflex">
					<fieldset>
						<legend>Сортировать по</legend>
						<select
							className="browser-default custom-select"
							onChange={this.onChangeHandler}
							name="sortBy"
							disabled={this.props.isLoading === true}
							>
								<option value="id">Дата загрузки</option>
								<option value="name">Название</option>
								<option value="likes">Количество лайков</option>
						</select>
					</fieldset>
					<fieldset>
						<legend>Порядок сортировки</legend>
							<select
							className="browser-default custom-select"
							onChange={this.onChangeHandler}
							name="direction"
							disabled={this.props.isLoading === true}
							>
								<option value="asc">По возрастанию</option>
								<option value="desc">По убыванию</option>
						</select>
					</fieldset>
				</div>

				<div className="subflex">
					<fieldset>
						<legend>Кол-во элементов на экране</legend>
						<select
							className="browser-default custom-select"
							onChange={this.onChangeHandler}
							defaultValue={String(this.props.limit)}
							name="limit"
							disabled={this.props.isLoading === true}
							>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="50">50</option>
								<option value="80">80</option>
								<option value="100500">Все</option>
						</select>
					</fieldset>
					<fieldset>
						<legend>Показывать теги</legend>
						<select
							className="browser-default custom-select"
							onChange={this.onChangeHandler}
							name="tag"
							disabled={this.props.isLoading === true}
							>
								<option value="all">Все</option>
								{
									this.props.tags
										.map(tag => <option key={tag} value={tag}>{tag}</option>)
								}
						</select>
					</fieldset>
				</div>
			</div>
		);
  }
}


export default connect(
  (store: storeState) => ({
    isLoading: store.loading,
		limit: store.filters.limit,
		tags: store.tags,
  }),
)(Selects);
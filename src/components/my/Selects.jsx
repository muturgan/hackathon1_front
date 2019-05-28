import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFiltes, fetchTags } from '../../store/ac';
import './Selects.css';

class Selects extends Component {

  componentDidMount() {
		this.props.dispatch(fetchTags());
	}

	onChangeHandler = (ev) => {
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
							defaultValue={this.props.limit}
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
  store => ({
    isLoading: store.loading,
		limit: store.filters.limit,
		tags: store.tags,
  }),
)(Selects);
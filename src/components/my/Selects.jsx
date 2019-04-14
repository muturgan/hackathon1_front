import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFiltes, newError } from '../../store/ac';
import { BASE_URL } from '../../store/base_url.js';

class Selects extends Component {

	constructor() {
    super();

    this.state = {
      tags: [],
    };
  }

  componentDidMount() {
    this.fetchTags();
	}
	
	fetchTags = async () => {
		const data = await fetch(`${BASE_URL}/tags`)
			.then(res => res.json());

		if (data.success === false) {
      this.props.dispatch(newError({code: 'Ошибка загрузки списка тегов', message: data.message}));
      return;
		}
		
		this.setState({
      tags: data.tags,
    });
	};

	onChangeHandler = (ev) => {
    this.props.dispatch(setFiltes({
      [ev.target.name]: ev.target.value,
    }));
	}

  render() {
    return(
			<React.Fragment>
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
				<select
					className="browser-default custom-select"
					onChange={this.onChangeHandler}
					name="direction"
					disabled={this.props.isLoading === true}
					>
						<option value="asc">По возрастанию</option>
						<option value="desc">По убыванию</option>
				</select>
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
				<select
					className="browser-default custom-select"
					onChange={this.onChangeHandler}
					name="tag"
					disabled={this.props.isLoading === true}
					>
						<option value="all">Все</option>
						{
							this.state.tags
								.map(tag => <option key={tag} value={tag}>{tag}</option>)
						}
				</select>
			</React.Fragment>
		);
  }
}


export default connect(
  store => ({
    isLoading: store.loading,
    limit: store.filters.limit,
  }),
)(Selects);
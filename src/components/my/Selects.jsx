import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFiltes } from '../../store/ac';

class Selects extends Component {

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
					>
						<option value="id">Дата загрузки</option>
						<option value="name">Название</option>
						<option value="likes">Количество лайков</option>
				</select>
				<select
					className="browser-default custom-select"
					onChange={this.onChangeHandler}
					name="direction"
					>
						<option value="asc">По возрастанию</option>
						<option value="desc">По убыванию</option>
				</select>
				<select
					className="browser-default custom-select"
					onChange={this.onChangeHandler}
					defaultValue="20"
					name="limit"
					>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="80">80</option>
						<option value="100500">Все</option>
				</select>
			</React.Fragment>
		);
  }
}


export default connect(
  store => ({
    token: store.user.token,
    isLoading: store.loading,
    filters: store.filters,
    images: store.images,
  }),
)(Selects);
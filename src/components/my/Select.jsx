import React, { Component } from 'react';

export class Select extends Component {
  render () {
    return(
			<select className="browser-default custom-select">
				<option value="id">Дата загрузки</option>
				<option value="name">Название</option>
				<option value="likes">Количество лайков</option>
			</select>
    );
  }
}
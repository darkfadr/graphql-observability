import faker from 'faker';
import BaseDataSource from './BaseDataSource';
import api from '../clients/mjml'


export default class EmailDatasource extends BaseDataSource {
  constructor(){
    super();
  }

  create(id?: string) {
    return {
      id: id || faker.random.number(),
      html: '<html><body><h1>Hello</h1></body></html>'
    }
  }

  render(mjml: string) {
    return api.post('/render', { mjml });
  }

  findAll() {
    const data = [];

    for (var i=0; i < faker.random.number(); i++) {
      data.push(this.create());
    }

    return data;
  }

  findById(id: string) {
    return this.create(id);
  }
}
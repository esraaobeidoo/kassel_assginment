'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ id });
    } else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  async update(id, data) {
    const record = await this.model.findOne({ where: { id } });
    if (record) {
      return await record.update(data);
    }
    return null;
  }

  async delete(id) {
    const record = await this.model.findOne({ where: { id } });
    if (record) {
      return await record.destroy();
    }
    return null;
  }
}

module.exports = DataCollection;
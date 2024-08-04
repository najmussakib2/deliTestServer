// QueryBuilder.js
class MultiQueryBuilder {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    search(fields) {
      if (this.queryString.search) {
        const searchObj = {};
        fields.forEach(field => {
          searchObj[field] = { $regex: this.queryString.search, $options: 'i' };
        });
        this.query = this.query.find({ $or: [searchObj] });
      }
      return this;
    }
  
    filter() {
      // Implement your filtering logic here
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      }
      return this;
    }
  
    fields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  
    limit() {
      if (this.queryString.limit) {
        const limit = this.queryString.limit * 1;
        this.query = this.query.limit(limit);
      }
      return this;
    }
  
    async countTotal() {
      const count = await this.query.model.countDocuments();
      return count;
    }
  
    get modelQuery() {
      return this.query;
    }
  }
  
  export default MultiQueryBuilder;
  
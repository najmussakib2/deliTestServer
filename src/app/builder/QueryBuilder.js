
class QueryBuilder {
  constructor(modelQuery, query) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search query
  search(searchableFields) {
    const { searchTerm } = this.query;

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({ [field]: searchRegex })),
      });
    }

    return this;
  }

  // Price range query
  priceRange() {
    const minPrice = Number(this.query.minPrice);
    const maxPrice = Number(this.query.maxPrice);

    if (minPrice && maxPrice) {
      this.modelQuery = this.modelQuery.find({
        price: { $gte: minPrice, $lte: maxPrice },
      });
    } else if (minPrice) {
      this.modelQuery = this.modelQuery.find({ price: { $gte: minPrice } });
    } else if (maxPrice) {
      this.modelQuery = this.modelQuery.find({ price: { $lte: maxPrice } });
    }

    return this;
  }

  // filter query
  filter() {
    const queryObject = { ...this.query };

    // remove unwanted fields
    const excludeFields = [
      "searchTerm",
      "limit",
      "sort",
      "page",
      "fields"
    ];

    excludeFields.forEach((field) => delete queryObject[field]);

    // Get the remaining query fields
    const fields = Object.entries(queryObject);

    // Create an array of objects for each key-value pair
    const fieldQuery = fields
      .map(([key, value]) => {
        const values = Array.isArray(value) ? value : value.split(",");
        return values.map((v) => ({ [key]: v.trim() }));
      })
      .flat();
    const filterFieldQuery = fields.length ? { $or: fieldQuery } : queryObject;
    this.modelQuery = this.modelQuery.find(filterFieldQuery);
    return this;
  }

  // sort query
  sort() {
    const sort = (this.query.sort || "").split(",").join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // limit query
  limit() {
    const limit = Number(this.query.limit) || 10;
    this.modelQuery = this.modelQuery.limit(limit);
    return this;
  }

  // pagination query
  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // field limiting
  fields() {
    const fields = (this.query.fields || "").split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();

    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
    };
  }
}
export default QueryBuilder;
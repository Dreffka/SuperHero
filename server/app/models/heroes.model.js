module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
      {
        nickname: String,
        real_name: String,
        origin_description: String,
        superpowers: String,
        catch_phrase: String,
        images: String
      },
      { timestamps: true }
    )
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject()
      object.id = _id
      return object
    })

    schema.plugin(mongoosePaginate)
  
    const Heroes = mongoose.model("heroes", schema)
    return Heroes
  }
class Apifeature{
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr
    }

    search(){
        const keyword = this.querystr.keyword ? {
            name:{
                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({...keyword})

        return this
    }

    filter(){
        const queryCopy = {...this.querystr};

        //removing the feild for category
        const removeFeild = ["keyword","page","limit"];

        removeFeild.forEach(key => delete queryCopy[key]);

        //filter for price and rating
        let queryString = JSON.stringify(queryCopy);

        queryString = queryString.replace(/\b(lt|gt|lte|gte)\b/g,key=> `$${key}`);

        this.query =  this.query.find(JSON.parse(queryString));
        return this;
    }
    pagination(resultPerPage){
        const currentpage = Number(this.querystr.page) ||1;  // 50 10 

        const skip = resultPerPage * (currentpage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this;
    }
}

module.exports = Apifeature;
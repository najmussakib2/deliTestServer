import express from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import QueryBuilder from "../../builder/QueryBuilder.js";
import { District, Division, Union, Upazilla } from "./geoData.model.js";
import httpStatus from "http-status";

const router = express.Router()

router.get('/division', catchAsync( async(req, res) => {
    const resultQuery = new QueryBuilder(Division.find(), req.query)
        .search(["id", "_id", "name", "bn_name"])
        .filter()
        .sort()
        .fields()
        .paginate()
        .limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'geo data are retrieved successfully',
        meta: meta,
        data: result,
    });
}))

router.get('/district',catchAsync( async(req, res) => {
    const resultQuery = new QueryBuilder(District.find(), req.query)
        .search(["id", "_id", "name", "division_id", "bn_name"])
        .filter()
        .sort()
        .fields()
        .paginate()
        .limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'geo data are retrieved successfully',
        meta: meta,
        data: result,
    });
}))

router.get('/upozilla', catchAsync( async(req, res) => {
    const resultQuery = new QueryBuilder(Upazilla.find(), req.query)
        .search(["id", "_id", "name", "bn_name", "district_id"])
        .filter()
        .sort()
        .fields()
        .paginate()
        .limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'geo data are retrieved successfully',
        meta: meta,
        data: result,
    });
}))

router.get('/union',catchAsync( async(req, res) => {
    const resultQuery = new QueryBuilder(Union.find(), req.query)
        .search(["id", "_id", "name", "bn_name", "upazilla_id"])
        .filter()
        .sort()
        .fields()
        .paginate()
        .limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'geo data are retrieved successfully',
        meta: meta,
        data: result,
    });
}))


export const geoRoutes = router;
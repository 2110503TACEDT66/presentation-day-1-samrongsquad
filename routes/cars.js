const express = require('express');
const {getCars, getCar, createCar, updateCar, deleteCar} = require('../controllers/cars');
const router = express.Router();
//router มีหน้าที่ส่งต่อ request ให้กับ method ที่เกี่ยวข้อง (ซึ่งเป็น method ที่อยู่ในส่วนของ cars)

router.route('/').get(getCars).post(createCar);
router.route('/:id').get(getCar).put(updateCar).delete(deleteCar);

module.exports = router;
const express=require('express')

const router=express.Router()

const {getOffersList,getOffer,acceptOffer,postOffer}=require('../controllers/offers')



router.route('/').get(getOffersList)

router.route('/:id').get(getOffer).patch(acceptOffer)

router.route('/post').post(postOffer)

module.exports=router
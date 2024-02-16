const express=require('express')

const router=express.Router()

const {getOffersList,getOffer,acceptOffer}=require('../controllers/offers')



router.route('/').get(getOffersList)

router.route('/:id').get(getOffer).patch(acceptOffer)


module.exports=router
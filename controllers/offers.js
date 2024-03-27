const User=require("../models/user")
const Offer=require("../models/offers");
const Book=require("../models/book")


const getOffersList=async (req,res)=>{
    //offers li rahoum waslinlah
    const user = await User.findOne({ _id: req.headers.value });
    const offers_id_list=user.offers_a_id

    const offers= await Promise.all(offers_id_list.map(async(offer_id)=>{
        const {book_a_id,user_b_id}=await Offer.findById(offer_id)
        const user_b=await Offer.findById(user_b_id,{name:1})
        const book_a=await Book.findById(book_a_id,{name:1,author:1,image:1})
        return {offer_id,user_b,book_a}

    }))
    res.json(offers)
    
}

const getOffer=async(req,res)=>{
    const offer=Offer.findById(req.body.offer_id)
    const {isbn_a,user_b_id,isbns_b}=await Offer.findById(offer._id)


    
}

const acceptOffer=async(req,res)=>{
    try {
        //delete the exchanged book from the other offers 

        const { accepted_book_isbn, offer_id,user_b_id } = req.body;  

        await Offer.findByIdAndUpdate(offer_id,{ status: "accepted" }, { new: true })

  
        const updated_offers=await Offer.find({user_b_id:user_b_id,isbns_b:{$in:[accepted_book_isbn]}})
        await Promise.all (
                updated_offers.map(async (updated_offer)=>{
                const isbn_b_index=updated_offer.isbns_b.indexOf(accepted_book_isbn)
                updated_offer.isbns_b.splice(isbn_b_index,1)
                if (updated_offer.isbns_b.length!=0){
                    await updated_offer.save()
                }
                else
                {
                await User.findOneAndUpdate({_id:updated_offer.user_b_id},{$pull:{offers_b_id:updated_offer._id}},{new:true})
                await User.findOneAndUpdate({_id:updated_offer.user_a_id},{$pull:{offers_a_id:updated_offer._id}},)
                await updated_offer.remove();
                
                }
            
            }))
      
        
        res.json('offer accepeted')
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" }); 
    }
    

}


const rejectOffer=async(req,res)=>{
    try {
        await Offer.findByIdAndDelete(req.body.offer_id)
    } catch (error) {
        
    }
    
    
}






const postOffer=async(req,res)=>{
    const user_b = await User.findOne({ _id: req.headers.value });
    if (!user_b) {
        return res.status(404).json({ error: 'User not found' });}
    
    const user_b_id=user_b._id
    const {books_b_id,book_a_id,user_a_id}=req.body

    const offer={
        user_a_id,
        user_b_id,
        book_a_id,
        books_b_id,
        status:'on hold',
    }

    try {
        const createdOffer = await Offer.create(offer);
        const user_a=await User.findById(user_a_id)

        user_a.offers_a_id.push(createdOffer._id)
        user_a.save()

        user_b.offers_b_id.push(createdOffer._id)
        user_b.save()


        console.log('Offer created successfully:', createdOffer);
        // Respond with success message or data if needed
        res.status(201).json({ message: 'Offer created successfully', offer: createdOffer });
    } catch (error) {
        console.error('Error creating offer:', error);
        // Respond with an error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports={
    getOffer,
    getOffersList,
    acceptOffer,
    postOffer
}
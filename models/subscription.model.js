import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,  
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        enum: ['USD', 'EUR', 'GBP', 'INR'], // Add more currencies as needed
        default: 'USD',
    },
    frequency: {
        type: String,
        required: [true, 'Frequency is required'],
        enum: ['daily', 'weekly', 'monthly', 'yearly'], // Add more frequencies as needed
        default: 'monthly',
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['basic', 'premium', 'enterprise'], // Add more categories as needed
        default: 'basic',
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment Method is required'],
        enum: ['credit_card', 'paypal', 'bank_transfer'], // Add more payment methods as needed
        default: 'credit_card',
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['active', 'inactive', 'pending'], // Add more statuses as needed
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate : {
            validator: function(value) {
                return value <= new Date(); // Start date should not be in the future
            },
            message: 'Start Date cannot be in the future'
        }
    },
    renewalDate: {
        type: Date,
        validate : {
            validator: function(value) {
                return value >= this.startDate; // Start date should not be in the future
            },
            message: 'Start Date cannot before start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true,
    }
}, {Timestamps:true});

subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if(this.renewalDate < new Date()){
        this.status = 'inactive'; // Set status to inactive if renewal date is in the past
    }
    next();
})

const subscription = mongoose.model('Subscription', subscriptionSchema);

export default subscription;
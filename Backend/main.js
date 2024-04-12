import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const PORT = 3030;
const app = express();
let collectionList = [];
let CrimeModel;
app.use(cors());

app.listen(PORT, (err) => {
    if (err) {
        console.error('Unable to start server:', err);
        return;
    }
    console.log('Server listening on port', PORT);
});

(async function connectToDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/FIR_Records');
    const Connection = mongoose.connection;
    (await Connection.listCollections()).map((collection) => { collectionList.push(collection.name) })
})().catch((err) => console.log('[connectToDb]', err))

const crimeRecordSchema = new mongoose.Schema({
    Latitude: Number,
    Longitude: Number,
    CrimeGroup_Name: String,
    CrimeHead_Name: String
});

async function getCrimeData(district) {
    try {
        const modelName = `${district}_records`;
        if (mongoose.modelNames().includes(modelName)) {
            CrimeModel = mongoose.model(modelName);
        } else {
            CrimeModel = mongoose.model(modelName, crimeRecordSchema, modelName);
        }
        const crimeRecords = await CrimeModel.find()
            .where('Latitude').gt(12.9)
            .where('Latitude').lt(12.9999)
            .select('Latitude Longitude CrimeGroup_Name CrimeHead_Name FIRNo FIR_Date ActSection Place_of_Offence Complaint_Mode')
        return crimeRecords;
    } catch (error) {
        console.error('[getCrimeData] Error:', error);
        throw error;
    }
}

app.use((err, req, res, next) => {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.use(['/data'], async (req, res, next) => {
    if (collectionList.includes(`${req.query.district.toLowerCase()}_records`)) {
        next();
    } else {
        res.status(404).json({ error: 'Location Record Not Found' });
    }
})

app.get('/data', async (req, res) => {
    try {
        const crimeRecords = await getCrimeData(req.query.district.toLowerCase());
        res.json(crimeRecords);
    } catch (error) {
        console.error('[/data] Error:', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});

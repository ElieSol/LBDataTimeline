/!\ Still in developpment  (unfinished)

# LBDataTimeline

Command to run dev:

```bash
npm run start-dev
```
To visualize demo of app, go in the demo-react folder:

```bash
npm run start 
```

Unit test run :

```bash
npm test -- \path\to\unit-test-file (i.e. controllers/DemoController)}
```

# Mutation data format in cBioportal
```
export type Mutation = {
    'aminoAcidChange': string

        'center': string

        'driverFilter': string

        'driverFilterAnnotation': string

        'driverTiersFilter': string

        'driverTiersFilterAnnotation': string

        'endPosition': number

        'entrezGeneId': number

        'fisValue': number

        'functionalImpactScore': string

        'gene': Gene

        'keyword': string

        'linkMsa': string

        'linkPdb': string

        'linkXvar': string

        'molecularProfileId': string

        'mutationStatus': string

        'mutationType': string

        'ncbiBuild': string

        'normalAltCount': number

        'normalRefCount': number

        'patientId': string

        'proteinChange': string

        'proteinPosEnd': number

        'proteinPosStart': number

        'referenceAllele': string

        'refseqMrnaId': string

        'sampleId': string

        'startPosition': number

        'studyId': string

        'tumorAltCount': number

        'tumorRefCount': number

        'uniquePatientKey': string

        'uniqueSampleKey': string

        'validationStatus': string

        'variantAllele': string

        'variantType': string
};
```

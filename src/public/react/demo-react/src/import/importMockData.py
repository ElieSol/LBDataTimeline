# -*- coding: utf-8 -*

import sys
import re
import os
import csv

path = "/home/julies/Internship_Project/LBDataTimeline/src/public/react/demo-react/src/mockData/Patient_1209"

mergedMutationList = []

for element in os.listdir(path):
    listOfMutation = []
    if(element != ".DS_Store"):
        filedenom = element.split('.')[0]
        sampleID = filedenom.split('_')[0]
        sampleDate = filedenom.split('_')[1] 
        filename= path+"/"+element 
        current_file = open(filename, 'r')
        content = current_file.readline()
        for line in current_file:
            dictInfoMut = {} 
            if(line[0]!='#'):
                chromo = line.split("   ")[0]
                pos = line.split("   ")[1]
                ref = line.split("   ")[2]
                alt = line.split("   ")[3]
                gene = line.split("   ")[4]
                varType = line.split("   ")[5]
                cov = line.split("   ")[6]
                sr = line.split("   ")[7]
                vaf = line.split("   ")[8]
                aaChange = line.split("   ")[22]
                dictInfoMut['SAMPLEID'] = sampleID
                dictInfoMut['DATE'] = sampleDate
                dictInfoMut['CH']=chromo
                dictInfoMut['POS']=pos
                dictInfoMut['REF']=ref
                dictInfoMut['ALT']=alt
                dictInfoMut['GENE']=gene
                dictInfoMut['VARTYPE']=varType
                dictInfoMut['COV']=cov
                dictInfoMut['SR']=sr
                dictInfoMut['VAF']=vaf
                dictInfoMut['AACHANGE']=aaChange
                listOfMutation.append(dictInfoMut)
        mergedMutationList.append(listOfMutation)
return mergedMutationList
                


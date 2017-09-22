import csv
import re
import os

def calculateAbsolute(chromosome, start, end):
    lengths_ref = os.path.dirname(os.path.abspath(__file__)) + '/static/hg19.chrom.sizes.txt'
    lengths = {}

    chromosome = format_chromosome(chromosome)

    with open(lengths_ref, mode='r') as data_file: 
        reader = csv.reader(data_file, delimiter='\t')
        for row in reader:
            title = format_chromosome(row[0])
            lengths[title] = int(row[1])

    wanted_lengths = {k: v for k, v in lengths.items() if k < chromosome}
    add_length = sum(wanted_lengths.values())
    return[(int(start) + add_length), (int(end) + add_length)]


def format_chromosome(chromosome):
    match = re.match(r"([a-z]+)([0-9]+)", chromosome, re.I)
    if match:
        (txt,num) = match.groups()
        chromosome = txt + num.zfill(2)
    return chromosome.lower()

def unformat_chromosome(chromosome):
    match = re.match(r"([a-z]+)([0-9]+)", chromosome, re.I)
    if match:
        (txt,num) = match.groups()
        chromosome = txt.lower() + num.lstrip('0') 
    return chromosome.replace('x', 'X').replace('y', 'Y')
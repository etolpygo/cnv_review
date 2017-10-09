import os

DIR_NAME = os.path.dirname(os.path.abspath(__file__))

def load_chromosome_sizes(fname=DIR_NAME + '/static/hg19.chrom.sizes.txt'):
    """Parse chromosome lengths from a static file.

    Returns a dict of {string chromosome_name: integer length}
    """
    chrom_sizes = {}
    with open(fname) as f:
        for line in f:
            chrom, length = line.split('\t', 1)
            chrom_sizes[chrom] = int(length.rstrip())
    return chrom_sizes


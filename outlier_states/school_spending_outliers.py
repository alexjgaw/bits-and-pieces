import os

# filename = "small_dataset.txt"
filename = "big_dataset.txt"
column = "Total"
size = os.stat(filename).st_size
# arbitrary size limit
too_big = size > 2**30

def process_by_line(name):
    print("Processing by line...")
    import csv
    import math

    n = r1 = r2 = 0
    outliers = [["Geographic area", "Total"]]

    # first pass so we can calculate std dev
    with open(filename, newline="") as file:
        data_reader = csv.DictReader(file, delimiter="\t")
        for row in data_reader:
            # keep a running total of the samples and the sum of their squares
            s = int(row[column])
            n += 1
            r1 += s
            r2 += s * s

    mean = r1 / n
    # calculating std dev in one pass might be unstable, but it'll do for this project
    stdev = math.sqrt(r2 / n - (mean * mean))

    # second pass to identify outliers
    with open(filename, newline="") as file:
        data_reader = csv.DictReader(file, delimiter="\t")
        for row in data_reader:
            if abs(int(row[column]) - mean) > stdev and "United States" not in row:
                outliers.append([row["Geographic area"], row[column]])

    return outliers

def process_at_once(name):
    print("Processing at once...")
    import pandas
    df = pandas.read_csv(name, sep="\t", usecols=range(2), skiprows=[1])

    mean = df[column].mean()
    stdev = df[column].std()

    outlier_condition = abs(df[column] - mean) > stdev
    return df[outlier_condition]

outliers = process_by_line(filename) if too_big else process_at_once(filename)

print(len(outliers))
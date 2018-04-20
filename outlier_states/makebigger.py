import pandas
import os

filename = "big_dataset.txt"
new_filename = "big_dataset.txt"

print(os.stat(new_filename).st_size)

while os.stat(new_filename).st_size < 2**30:
    data = pandas.read_csv(filename, sep='\t')
    new_file = pandas.read_csv(new_filename, sep='\t')
    new_file = pandas.concat([new_file, data], ignore_index=True)
    new_file.to_csv(new_filename, sep='\t', index=False)
    print(os.stat(new_filename).st_size)
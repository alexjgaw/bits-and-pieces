import pandas

filename = "Public School K-12 Education Spending Per Pupil by State 2014.txt"

states = pandas.read_csv(filename, sep='\t', usecols=range(2), skiprows=[1])

mean = int(states["Total"].mean())
stdev = int(states["Total"].std())

outlier = abs(states['Total'] - mean) > stdev
outlier_states = states[outlier]

print(states)
print(outlier_states)
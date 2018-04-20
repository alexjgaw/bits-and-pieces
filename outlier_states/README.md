# Find Outliers in State Spending on Education

This was a quick challenge to extract information from a tab delimited text file, perform a mean and a standard deviation calculation (which luckily pandas already can do) and list the states more than one standard deviation outside the average.

# Version 2
## Dealing with large files
This was neat. After I submitted the original solution I was asked a few follow-up questions. How would I find when the program breaks on file size, what to do when dealing with a file too large to hold in memory, what to do about bad data. I decided to add some logic to deal with large files so that, hopefully, it would *never* break on file size. There are obviously ways I could make it more reliable and more reusable, but for now I'm happy to have had the chance to deal with memory issues and different methods of processing data. This is so far outside what was covered in my coding course, but it's basic for CS grads, which means I really should know it.

# To test
Run `makebigger.py` in order to create a file larger than the arbitrary size constraint for the default process. Test the program by commenting or uncommenting lines 5 and 6 in `school_spending_outliers.py` and running it in the console.
# pagination

Hey Marcelo,
Any insight is greatly appreciated… 

I put a copy of the JSON response data that I'm working with in response.json. It 's just values, names and receipts of the “Despesas” of a particular deputado.

What I'm trying to do:
 I want to save the ‘x-total-count’ of objects into an array, so I can do total sums, sums by month, etc. 

The Problem: 
The API limits the total number of items to 100 per call. In my code there are more, 128 total. How do I make sequential calls using self, first, last, next contained in the links array?

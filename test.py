import math
m = 0.067 - 0.025
h = .105
t = .73
S = .5
g = 9.8

Ep = m*g*h
V = (2*S)/t
Ek = (m*(V**2))/2
dE = Ep - Ek
Epison = dE / Ep * 100
print(Ep, V, Ek, dE, Epison)
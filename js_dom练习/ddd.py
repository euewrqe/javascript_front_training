def f1(n):
    if n==1:
        return 1
    return f1(n-1)*n


print(f1(6))
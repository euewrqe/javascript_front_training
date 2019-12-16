a=["a","b","c"]

li=set()
def f1(arg,n,arg2):
    '''arg取首字母，arg2取arg除了首字母的'''
    first=arg[0]
    for i in arg2[0:n]:
        first+=i
    li.add(first)

    if n>0:
        n-=1
        f1(arg,n,arg2)

    if len(arg2)>0:
        arg2=arg2[1:len(arg2)]
        f1(arg,len(arg2),arg2)

    if len(arg)>1:
        arg=arg[1:len(arg)]
        f1(arg,len(arg),arg[1:len(arg)])
    return li

print(f1(a,len(a),a[1:len(a)]))

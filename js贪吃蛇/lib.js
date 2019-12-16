function randomInt(first, step, limit) {
    item = parseInt(Math.random() * step + first);
    if (item % limit != 0) {
        item-=item % limit
    }
    
    return item;
}
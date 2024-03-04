def num(arrays):
    counts = {}
    for array in arrays:
        tuple_ = tuple(sub_array[0] for sub_array in array)
        if tuple_ in counts:
            counts[tuple_] += 1
        else:
            counts[tuple_] = 1

    for tuple_, count in counts.items():
        print(f"Note scoring path {list(tuple_)} is taken {count} times")

arrays = [
    [[0, 0.00], [1, 0.00], [2, 0.00], [3, 0.00], [4, 0.00], [5, 0.00], [6, 0.00], [7, 0.00]],
    [[0, 0.00], [1, 0.00], [2, 0.00], [3, 0.00], [4, 0.00], [5, 0.00], [6, 0.00], [7, 0.00]],
    [[0, 0.00], [1, 0.00], [2, 0.00], [3, 0.00], [4, 0.00], [5, 0.00], [6, 0.00], [7, 0.00]],
    [[1, 0.00], [1, 0.00], [2, 0.00], [3, 0.00], [4, 0.00], [5, 0.00], [6, 0.00], [7, 0.00]],
    [[0, 0.00], [1, 0.00], [2, 0.00], [3, 0.00], [4, 0.00], [7, 0.00], [6, 0.00], [7, 0.00]]
]

num(arrays)
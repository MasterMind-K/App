#include <iostream>
#include <cstdlib>
#include <ctime>

extern "C" int generate_random() {
    std::srand(std::time(0));
    return std::rand() % 100 + 1;
}

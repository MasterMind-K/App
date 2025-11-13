#include <cstdlib>
#include <ctime>

using namespace std;

extern "C" int generate_random() {
    return rand() % 20 + 1;
}
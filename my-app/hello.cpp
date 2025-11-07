#include <cstdlib>
#include <ctime>

using namespace std;

extern "C" int generate_random() {
    srand(time(0));
    return rand() % 20 +1;
}
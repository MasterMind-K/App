#include <linux/module.h>
#include <linux/init.h>

static int __init my_init(void){
	printk("hello - Hello, Kernel!\n");
	return 0;
}

static void __exit my_exit(void){
	printk("hello - Goodbye, Kernel!\n");
}

module_init(my_init);
module_exit(my_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Spyro");
MODULE_DESCRIPTION("Simple Hello World linux Kernel Module");

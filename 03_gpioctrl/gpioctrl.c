#include <linux/module.h>
#include <linux/init.h>
#include <linux/gpio/consumer.h>
#include <linux/fs.h>
#include <linux/device.h>
#include <linux/uaccess.h>

static struct gpio_desc *led, *button;

#define IO_LED 21
#define IO_BUTTON 20
#define IO_OFFSET 512


static int major;
static struct class *gpio_class;

/*
 * CHAR DEVICE: write()
 * - writing "1" -> LED ON
 * - writing "0" -> LED OFF
 */
static ssize_t gpioctrl_write(struct file *file,
							  const char __user *buf,
							  size_t count,
							  loff_t *ppos)
{
	char c;

	if (copy_from_user(&c, buf, 1))
		return -EFAULT;

	if (c == '1')
	{
		gpiod_set_value(led, 1);
	}
	else if (c == '0')
	{
		gpiod_set_value(led, 0);
	}
	else if (c == '\n' || c == '\r')
	{
		return count; // ignoruj newline
	}
	else
	{
		return -EINVAL;
	}

	return 1;
}

static struct file_operations fops = {
	.owner = THIS_MODULE,
	.write = gpioctrl_write,
};

/*
 * INIT
 */
static int __init my_init(void)
{
	int status;

	printk("gpioctrl: loading module\n");

	led = gpio_to_desc(IO_LED + IO_OFFSET);

	if (!led)
	{
		printk("gpioctrl - Error getting LED pin\n");
		return -ENODEV;
	}
	button = gpio_to_desc(IO_BUTTON + IO_OFFSET);
	if (!button)
	{
		printk("gpioctrl - Error getting button pin\n");
		return -ENODEV;
	}

	status = gpiod_direction_output(led, 0);
	if (status)
		return status;

	status = gpiod_direction_input(button);
	if (status)
		return status;

	/* REGISTER CHARACTER DEVICE */
	major = register_chrdev(0, "gpioctrl", &fops);
	if (major < 0)
	{
		printk("gpioctrl: failed to register char device\n");
		return major;
	}

	gpio_class = class_create("gpioctrl");
	if (IS_ERR(gpio_class))
	{
		unregister_chrdev(major, "gpioctrl");
		return PTR_ERR(gpio_class);
	}

	device_create(gpio_class, NULL, MKDEV(major, 0), NULL, "gpioctrl");

	printk("gpioctrl: created /dev/gpioctrl (major=%d)\n", major);

	return 0;
}

/*
 * EXIT
 */
static void __exit my_exit(void)
{
	device_destroy(gpio_class, MKDEV(major, 0));
	class_destroy(gpio_class);

	unregister_chrdev(major, "gpioctrl");

	gpiod_set_value(led, 0);

	printk("gpioctrl: module unloaded\n");
}

module_init(my_init);
module_exit(my_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("4Linux / Modified");
MODULE_DESCRIPTION("GPIO LED control via character device");

FROM php:7.4-apache

RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
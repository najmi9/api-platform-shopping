<?php

namespace App\DataFixtures;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;
use App\Entity\Category;
use App\Entity\MediaObject;
use App\Entity\User;


class ProductsFixtures extends Fixture
{   
    private $encoder;

    function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {

    	$faker = \Faker\Factory::create('fr_FR');
        
        $user = new User();

        $user->setUsername("admin")
             ->setEmail("admin@gmail.com")
             ->setPassword($this->encoder->encodePassword($user, "123456"))
             ->setRoles(["ROLE_ADMIN", "ROLE_USER"])
        ;

        $manager->persist($user);


         $categories = [];
         for ($i=0; $i <1 ; $i++) { 
         	$category = new Category();
         	$category->setTitle($faker->sentence(3))
                     ->setDescription($faker->paragraph())
         	;
         	$manager->persist($category);
         	$categories[]=$category;
         }

    	 for ($i=0; $i < 20 ; $i++) { 
             $nomber = mt_rand(5,20);
    	 	 $product = new Product();
    	 	 $product->setTitle($faker->sentence(3))
                     ->setDescription($faker->paragraph())   
                     ->setCategory($faker->randomElement($categories))
                     ->setPrice((string)mt_rand(100, 1000)) 
                     ->setPicture("https://picsum.photos/id/{$nomber}/200/300")
                     ->setPromo("-".$nomber."%")
                     ->setAvailableQuantity(mt_rand(5,20))
    	 	 ;
             $manager->persist($product);
    	 }
        

        $manager->flush();
    }
}

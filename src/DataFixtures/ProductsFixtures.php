<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;
use App\Entity\Category;
use App\Entity\MediaObject;
use App\Entity\Like;


class ProductsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
    	$faker = \Faker\Factory::create('fr_FR');
         $categories = [];
         for ($i=0; $i <5 ; $i++) { 
         	$category = new Category();
         	$category->setTitle($faker->sentence(3))
                     ->setDescription($faker->paragraph())
         	;
         	$manager->persist($category);
         	$categories[]=$category;
         }
         

    	 for ($i=0; $i <10 ; $i++) { 
    	 	 $product = new Product();
    	 	 $product->setTitle($faker->sentence(3))
                     ->setDescription($faker->paragraph())
                     ->setPrice((string)mt_rand(100, 1000))
    	 	 ;
             $manager->persist($product);
    	 }
        

        $manager->flush();
    }
}

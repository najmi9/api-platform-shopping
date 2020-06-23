<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntiyManagerInterface;


class ApiActivation extends AbstractController
{
	
   
   public function __invoke(User $data, Request $request)
   {
    	
    	  $code =json_decode($request->getContent(), true) ;           
          if ($code && $code['activationCode'] === $data->getActivationCode()) {
                $data
                     ->setActivationCode(null)
                ;              
           }

   	 return $data;
   }
  
}
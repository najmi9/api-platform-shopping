<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use App\Repository\LikeRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Like;


class DeleteLike
{
    private $em, $likeRepo, $security;

    public function __construct(EntityManagerInterface $em, LikeRepository $likeRepo, Security $security)
    {
        $this->security = $security;
        $this->likeRepo = $likeRepo;
        $this->em = $em;
    }
  
    /**
     * @Route(
     *     name="book_post_publication",
     *     path="/products/{id}/likes/delete",
     *     methods={"POST"},
     *     defaults={
     *         "_api_resource_class"=Like::class,
     *         "_api_item_operation_name"="post_publication"
     *     }
     * )
     */

    public function __invoke($data)
    {
       
       $user = $this->security->getUser();
       $product = $data->getProduct();

       if ($user && $product) {
          $like = $this->likeRepo->findOneBy([
           "user"=> $user,
            "product"=>$product
       ]);
       }else{
        return $this->json([
        "message" => "soit l'utilisateur ou le produit n'existe pas !"
        ], 404);
       }

        if ($like) {
            $this->em->remove($like);
            $this->flush();
        }else{
            return $this->json([
      "message"=>"le like n'est existe pas !"
            ],404);
        }
       

        return $data;
    }
}